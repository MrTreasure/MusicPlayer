(function MediaPlayer(){
    //定义常用变量
    var obj = new Audio($(".active").getAttribute("data-song-link"));
    var radio;
    var lrcHeight=0;//得到歌词高度
    var dLrc=$("#lrc");
    var dDone=$("#done");
    var dProgress=$("#progress");
    var dVolume=$("#volume");
    var timer;
    var speed;
    var oldHeight=0;
    //初始化函数，绑定按钮
    var init=function(){
        $(".song-list").onclick=SonglistSelect;
        $("#play").onclick=Play;
        $("#pause").onclick=Pause;
        $("#volume").oninput=SetVolume;
    };
    init();
    //列表选择
    function SonglistSelect(e){
        obj.load();
        var url = e.target.getAttribute("data-song-link");
        obj = new Audio(url);
        setLrc(e);
        clearInterval(timer);
        $("#progress").value=0;
        $("#done").innerText="00:00";
        

    }
    //播放按钮
    function Play(){
        speed = Math.floor(lrcHeight/obj.duration)/10;
        console.log(speed);
        if(obj.paused){

            obj.volume = dVolume.value/100;
            timeSet();
            obj.play();
            timer = setInterval(function(){
                dDone.innerText = formatTime(obj.currentTime);
                radio = Math.floor((obj.currentTime/obj.duration)*100);
                dProgress.value=radio;
                //position=position-2;

                    if(radio>2){
                        oldHeight = oldHeight-speed ;
                        console.log(dLrc.style.top);
                        console.log(oldHeight);
                        dLrc.style.top = oldHeight+"px";
                    }



                if(obj.currentTime==obj.duration){
                    clearInterval(timer);
                }
            },100);
        }
    }
    //暂停按钮
    function Pause(){
        if(obj.paused===false){
            obj.pause();
            clearInterval(timer);
        }
    }
    //音量控制
    function SetVolume(e){
        obj.volume = $("#volume").value/100;
    }
    //得到音乐总时间
    function timeSet(){

        setTimeout(function(){
            $("#total").innerText=formatTime(obj.duration);
        },1000);


    }
    //ajax取得歌词
    function setLrc(e){
        var lrc;
        var lrcUrl=e.target.getAttribute("data-song-lrc");
        var xhr = new XMLHttpRequest();
        xhr.open('get',lrcUrl,true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                lrc=xhr.responseText;
                var finishLrc = lrc.replace(/\[.+?\]/g,"");
                dLrc.innerText=finishLrc;
                dLrc.style.top=0+"px";
                lrcHeight = dLrc.offsetHeight;
                oldHeight = 0;



            }
        };
        xhr.send(null);

    }



})();
