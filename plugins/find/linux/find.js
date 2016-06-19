let path = require('path')
let fs = require('fs-extra')
let child = require('child_process')
let config = require('../../../config')
let os = require('os');
let pluginConfig = {
  limit: 20
}, findProcess
module.exports = {
    setConfig: function (pConfig) {
      config.merge(pluginConfig, pConfig)
      let rep = p => fs.realpathSync(p.replace('~/', os.homedir() + '/'))
      pluginConfig.include_path = pluginConfig.include_path.map(rep) || os.homedir()
    },
    update: function (cb) {
      cb && cb()
    },
    exec: function (args, event) {
      if (args.join('').trim() === '') return  //空格返回空
      let patt = args.join('').toLocaleLowerCase()
      if(patt.indexOf('*')<0){
        patt = patt.replace(/(.)/g,'*$1*')
      }
      let cmd = `find ${pluginConfig.include_path.map(ip=>`"${ip}"`).join(' ')} `+
      `\\( ${pluginConfig.exclude_path.map(ep=>`-path "${ep}"`).join(' -o ')} \\)  -a -prune `+
      `-o \\( -type d -o -type f \\) ${pluginConfig.maxdepth?`-maxdepth ${pluginConfig.maxdepth}`:''} -name "${patt}" -print | grep '.' -m ${pluginConfig.limit}`
      console.log(cmd);
      let defaultIcon = __dirname+'/../assets/file.svg'
      findProcess && findProcess.kill()
      findProcess = child.exec(cmd, {
          encoding:'utf8-',
          timeout: 0,
          maxBuffer: 5 * 1024 * 1024 // 默认 200 * 1024
      }, (error, stdout, stderr)=>{
        if(error){
          console.error(error)
          return
        }
        stdout = stdout+''

        let items =  stdout.split('\n').slice(0, pluginConfig.limit)
            .filter(file=>!/^\s*$/.test(file)).map(file=>{
              return {
                name: path.basename(file),
                detail: file,
                icon: defaultIcon,
                value: file,
                opts: [
                  {name:'open',label:'Open'}, //first is default
                  {name:'copy-path',label:'Copy Path'}
                ]
              }
            })
        console.log(items);
        event.sender.send('exec-reply', items)
      })
  },
  execItem: function (item,  event) {
    switch (item.opt) {
      case 'copy-path':
      require('electron').clipboard.writeText(item.value);
        break
      case 'open':
      default:
      require('electron').shell.openItem(item.value)
    }

    event.sender.send('exec-item-reply')
  }
}
