(()=>{
    
    var ffmpreg=require('fluent-ffmpeg')
    var args=process.argv.slice(2)

    function baseName(str){
        var base =new String(str).substring(str.lastIndexOf('/')+1)
        if(base.lastIndexOf(".")!=-1){
            base=base.substring(0,base.lastIndexOf("."))
        }
        return base
    }
    args.forEach(function(val,index,array){
        var filename=val
        var basename=baseName(filename)
        ffmpreg(filename)
        .output(basename+"-1280x720.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('1280x720')
        //full hd
        .output(basename+"-1920x1080.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('1920x1080')
        
        .on('error',function(err){
            console.log(err)
        })
        .on('progress',function(prog){
            console.log("...frames"+prog.frames)
        })
        .on('end',function(){
            console.log("finished..")
        })
        .run()
    })
})()