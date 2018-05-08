const path = require('path')
const cosSdk = require('cos-nodejs-sdk-v5')
const dir = require('node-dir')

const base = path.resolve(__dirname, 'dist')
const {
  npm_package_name: projectname,
  npm_package_deploy_bucket: bucket,
  npm_package_deploy_region: region,
  npm_package_deploy_secretid: secretid,
  npm_package_deploy_secretkey: secretkey,
  npm_package_deploy_filepath: filepath
} = process.env

const cos = new cosSdk({
  SecretId: secretid,
  SecretKey: secretkey
})

dir.files(base, (err, files) => {
  if (err) return console.error(err)
  return files.forEach(file => {
    // for cross platform: windows and linux
    const key = file.replace(base, `${filepath}/${projectname}`).split(path.sep).join('/')
    cos.sliceUploadFile({
      Bucket: bucket,
      Region: region,
      Key: key,
      FilePath: file
    }, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(`upload cdn success ${file}`)
    })
  })
})
