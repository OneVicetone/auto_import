const fs = require('fs')

let fileData = []
const url = './src/'
const selectDir = process.argv[process.argv.length - 1].includes('selectDir')?
                  process.argv[process.argv.length - 1].split('-').pop():
                  process.argv[process.argv.length - 2].split('-').pop()
const ignoreComponent = process.argv[process.argv.length - 1].includes('ignore')?
                        process.argv[process.argv.length - 1].split('-').pop():
                        process.argv[process.argv.length - 2].split('-').pop()
function getComponents(url,ignore){
    let nowFile = {
        path:'',
        componentsList:[]
    }
    const fileDir = fs.readdirSync(url)
    if(fileDir === []) return
    for(let item of fileDir){
        // fs.stat(url+item,(err,data)=>{
        //     if(data.isDirectory()) getComponents(`${url}${item}/`)
        //     if(data.isFile()){
        //         if(item.includes('.vue')){
        //             nowFile.path = '.'+url
        //             const comp = {
        //                 name:item.split('.').shift(),
        //                 file:item
        //             }
        //             nowFile.componentsList.push(comp)
        //         }
        //     }
        // })
        if(!item.includes('.')){
            getComponents(`${url}${item}/`)
        }else if(item.includes('.vue') && !item.includes(ignore)){
            nowFile.path = '.'+url
            const comp = {
                name:item.split('.').shift(),
                file:item
            }
            nowFile.componentsList.push(comp)
        }
    }
    fileData.push(nowFile)
}

getComponents(url,ignoreComponent)
fileData.splice(0,1)

let importData = ''
for(let item of fileData){
    for(let item2 of item.componentsList){
        importData += `\nimport ${item2.name} from '${item.path}${item2.file}';`
    }
}
fs.appendFileSync(url+selectDir,importData)

