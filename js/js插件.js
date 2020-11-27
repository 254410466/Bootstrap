$(window).load(function(){
  //提示语句
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    //下拉菜单禁止收回
    $(document).on("click", ".regionItem", function(e){
        e.stopPropagation();
    })
  //模态框注册 
  var newform = $('#newform');
  $(document).ready(function () {

      newform.bootstrapValidator({
          message: '输入值不合法',
          feedbackIcons: {
              valid: 'glyphicon glyphicon-ok',
              invalid: 'glyphicon glyphicon-remove',
              validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
              uname: {
                  message: '用户名不合法',
                  validators: {
                      notEmpty: {
                          message: '用户名不能为空'
                      },
                      stringLength: {
                          min: 3,
                          max: 30,
                          message: '请输入3到30个字符'
                      },
                      regexp: {
                          regexp: /^[a-zA-Z0-9_\. \u4e00-\u9fa5 ]+$/,
                          message: '用户名只能由字母、数字、点、下划线和汉字组成 '
                      }
                  }
              },
              psw: {
                  validators: {
                      notEmpty: {
                          message: '密码不能为空'
                      },
                      regexp: {
                        regexp: /^[a-zA-Z0-9]{3,8}$/,
                        message: '密码只能由字母、数字组成的3-8位'
                    }
                  }
              }, 
              phone: {
                  validators: {
                      notEmpty: {
                          message: '手机号不能为空'
                      },
                      regexp: {
                          regexp: /^1[3456789]\d{9}$/,
                          message: '请输入以13——19开头的十一位号码'
                      }
                  }
              }, 
              email: {
                validators: {
                    notEmpty: {
                        message: 'email不能为空'
                    },
                    emailAddress: {
                        message: '请输入正确的邮件地址如：123@qq.com'
                    }
                }
            }
          }
      });
  })
  //模态框关闭
  function closenew(){
     $("#new").modal("hide"); 
  }
  //注册模态框验证
  $(".newuser").click(function(){
   $("#newform").data("bootstrapValidator").validate();  //启用验证
  var flag = $("#newform").data("bootstrapValidator").isValid(); //判断是否通过验证 true/false
  //通过则隐藏模态框并且传送数据
    if(flag){
      //接受数据
      var uname=$("#uname").value;
			var psd=$("#psd").value;
			var phone=$("#phone").value;
			var school=$("#email").value;
      $.ajax({
        url: "user.php?uname="+uname+"&psd="+psd+"&phone="+phone+"&email="+email,
				type: "GET",
				dataTye: "json",
				beforeSend: function(){
          alert("正在注册~~");
          closenew(); //隐藏
				},
				success: function(json){
         
          alert("注册成功！");
          alert("成功！ 您的信息如下:\n"+json);
				}
    })
  }else{
      alert("注册失败")
    }
  } 
 )
})

//导航条固定
//获取导航条
window.onload=function(){
  var tit = document.getElementById("navscroll");
  //alert(tit);
  //添加一个块来占据位置 
  var rect = tit.offsetHeight;//获得页面中导航条相对于浏览器视窗的位置
  var inser = document.createElement("div");
  inser.style.height = rect +"px";
  tit.parentNode.replaceChild(inser, tit);
  inser.appendChild(tit);
  //var bodys = document.getElementsByClassName("body")[0];
  //alert(bodys);
  //获取距离页面顶端的距离
  var titleTop = tit.offsetTop;
  //滚动事件
  document.onscroll = function(){
    //获取当前滚动的距离
      var btop = document.body.scrollTop||document.documentElement.scrollTop;
      //如果滚动距离大于导航条据顶部的距离
      if(btop>titleTop){
        //为导航条设置fix
          tit.className = "fiex";
    }else{
        //移除fixed
          tit.className = "";
    }
  }
  // 弹出框
  $(function(){
    $('#example').popover()

})
}

//canvas画图
  // //  canvas画布
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var nowtime = document.getElementById("nowtime");
  var r = 100;
  //进行绘制
function star(){
  context.save();
  context.beginPath();
  context.strokeStyle="black";
  context.lineWidth=8;
  
  context.translate(222,222)
  context.arc(0, 0, r+20, 0, 2*Math.PI, false);
  context.stroke();
  // 定义十二个刻度时间，因为画布圆从3位置开始扩大弧边
  var number = [3, 4, 5, 6, 7, 8 , 9, 10, 11 ,12 , 1, 2];
  var i;
  // 遍历
  for (i in number) {
    // alert(i);
    // 弧度
    var rad = 2 * Math.PI / 12 * i;
    // 坐标
    var intx = Math.cos(rad) * (100)  // 100是时针的长度
    var inty = Math.sin(rad) * (100)
    //文本写入数字
    context.fillText(number[i], intx, inty)     //  (文本， 横坐标， 纵坐标)
    context.font="15px Arial"
    context.textAlign="center"
    context.textBaseline="middle"
    //每秒的刻度
    for (let j = 0; j < 60; j++) {
      var rad_s = 2* this.Math.PI / 12 / 5 * j;
      // 坐标
      var intx = Math.cos(rad_s) * 110
      var inty = Math.sin(rad_s) * 115
      // 写入
      context.beginPath();
      //判断是时刻时扩大刻印
      if(j % 5 == 0 ){
        context.fillStyle= "#000"
        context.arc(intx, inty, 4, 0, 2*Math.PI, false)
      }else{
        context.fillStyle= "#7a7676"
        context.arc(intx, inty, 1, 0, 2*Math.PI, false)
      }
      context.fill()
      
    }
  }
}

// 时分秒直线    
//  时
function drawHour(hour,minute){
    context.save();
    var rad = 2*Math.PI /12 * hour;
    //alert(hour)
    //分针所带来的时针变化
    var mrad = 2* Math.PI / 12 / 60 * minute;
    context.rotate(rad + mrad);
    context.beginPath();
    context.lineWidth = 4;          //设置线宽状态
    context.lineCap="round"
    context.moveTo (0,0);       //设置起点状态
    context.lineTo (0,-r+ 40);      //设置末端状态
    context.stroke();    
     context.restore();
}
//  分
function drawMinute(minute){
    context.save();
    var rad = 2* Math.PI /60 * minute;
    context.rotate(rad);
    context.beginPath();
    context.lineWidth = 3;          //设置线宽状态
    context.lineCap="round"
    context.moveTo (0,0);       //设置起点状态
    context.lineTo (0, -r+ 15);      //设置末端状态   
    context.stroke();
    context.restore();
}
// 秒
function drawSecond(second){
  context.save();
  var rad = 2*Math.PI /60 * second;
  context.rotate(rad);
  context.beginPath();
  context.lineWidth = 1;          //设置线宽状态
  context.lineCap="round"
  context.moveTo (0,0);       //设置起点状态
  context.lineTo (0,-r);      //设置末端状态
  context.strokeStyle="red"
  context.stroke();    
  context.restore();
} 
setInterval(function(){
  //获取当前时间
  context.clearRect(0, 0, canvas.width, canvas.height)
  var time = new Date();
  var hour = time.getHours();
  // alert(hour)
  var minute = time.getMinutes();
  var second = time.getSeconds();
  star();
  drawHour(hour, minute);
  drawMinute(minute);
  drawSecond(second);
  context.restore();
  nowtime.innerHTML="当前时间为："+ time.getFullYear() + "年" + (time.getMonth()+1) + "月" + time.getDate()+ "日" + "星期" +time.getDay() + " &nbsp;&nbsp;" + hour + "时" + minute + "分" + second + "秒" 
},1000)  
  
