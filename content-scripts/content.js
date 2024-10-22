//第1个功能 ===========================================================

// 假设你之前添加的<style>标签有一个ID，比如"grayscale-style"  
var grayscaleStyleId = 'grayscale-style';  
  
// 添加灰度滤镜的函数  
function addGrayscaleFilter() {  
    // 创建一个style元素  
    var style = document.createElement('style');  
    style.id = grayscaleStyleId; // 设置ID以便后续移除  
    style.type = 'text/css';  
      
    // 添加CSS规则，使整个页面的内容变为灰度  
    style.innerHTML = `  
        html {  
			 filter: sepia(20%) hue-rotate(-90deg) saturate(150%);
        }  
    `;  
      // -webkit-filter: grayscale(100%);
      // filter: grayscale(100%); 
	  
    // 将style元素添加到head中  
    document.getElementsByTagName('head')[0].appendChild(style);  
}  
  
// 移除灰度滤镜的函数  
function removeGrayscaleFilter() {  
    var grayscaleStyle = document.getElementById(grayscaleStyleId);  
    if (grayscaleStyle) {  
        grayscaleStyle.parentNode.removeChild(grayscaleStyle);  
    }  
}  

const floatDivId = 'floating-div';
// 添加浮动div的函数  
function addFloatingDiv(text = 'qgao233') {  
    // 创建一个新的div元素  
    var floatingDiv = document.createElement('div');  
    floatingDiv.id = floatDivId; // 设置ID以便后续操作  
    floatingDiv.style.position = 'fixed'; // 设置为fixed，使其始终位于屏幕上的固定位置  
    floatingDiv.style.top = '10px'; // 距离屏幕顶部的距离  
    floatingDiv.style.right = '10px'; // 距离屏幕右侧的距离  
    floatingDiv.style.zIndex = '9999'; // 设置一个较高的z-index，确保其位于其他元素之上  
    floatingDiv.innerText = text; // 设置div的内容  
  
    // 将新创建的div添加到body中  
    document.body.appendChild(floatingDiv);  
}  
  
// 移除浮动div的函数  
function removeFloatingDiv() {  
    var floatingDiv = document.getElementById(floatDivId);  
    if (floatingDiv) {  
        floatingDiv.parentNode.removeChild(floatingDiv);  
    }  
}  
  
function judgeIfCheck(isCheck) {
	if(isCheck){
		// 使用示例：添加灰度滤镜
		console.log('添加灰度滤镜')
		addGrayscaleFilter();  
		// 使用示例：添加浮动div
		addFloatingDiv('灰度滤镜 by qgao233');  
	}else{
		// 在需要的时候，可以通过调用下面的函数来移除灰度滤镜
		console.log('移除灰度滤镜')
		removeGrayscaleFilter();
		// 在需要的时候，可以通过调用下面的函数来移除浮动div
		removeFloatingDiv();
	}
}

//第2个功能 ===========================================================

const ballId = 'qgao-floatingBall';
let fetchInterval = undefined;
// 定义获取数字的函数
function fetchNumber() {
    // 发送GET请求
    fetch('https://121.36.206.195:8989/users/sessionList/online') // 替换为你的后端API地址
        .then(response => response.json()) // 解析JSON响应
        .then(data => {
            // 假设后端返回的数字在data.total中
            document.getElementById(ballId).textContent = data.total; // 更新小圆球中的数字
        })
        .catch(error => {
            console.error('获取数字失败:', error); // 错误处理
        });
}
function openFetchNumber(){
	closeFetchNumber();
	// 每5秒调用fetchNumber函数
	fetchInterval = setInterval(fetchNumber, 5000);
	
	// 首次调用以立即显示数字
	fetchNumber();
}

function closeFetchNumber(){
	if(fetchInterval){
		clearInterval(fetchInterval);
	}
}


function addInfoDiv(){
	// 创建并插入样式
	const style = document.createElement('style');
	style.textContent = `
	    #qgao-floatingBall {
	        position: fixed;
	        right: 0; 
	        bottom: 0; 
	        /*transform: translateY(-50%);  垂直居中调整 */
	        width: 30px; /* 小圆球的宽度 */
	        height: 30px; /* 小圆球的高度 */
	        background-color: #007bff; /* 圆球的背景颜色 */
	        border-radius: 50%; /* 圆形 */
	        display: flex;
	        align-items: center;
	        justify-content: center;
	        color: white; /* 文字颜色 */
	        font-size: 10px; /* 字体大小 */
	        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 阴影效果 */
	        z-index: 1000; /* 确保在最上层 */
	    }
	`;
	document.head.appendChild(style);
	
	// 创建小圆球元素
	const ball = document.createElement('div');
	ball.id = ballId;
	ball.textContent = '0'; // 初始文本为0
	document.body.appendChild(ball);
	
	openFetchNumber();
}

function removeInfoDiv(){
	var floatingDiv = document.getElementById(ballId);
	if (floatingDiv) {  
	    floatingDiv.parentNode.removeChild(ballId);  
	} 
}

function judgeIfCheckGetInfo(isCheck){
	if(isCheck){
		addInfoDiv()
	}else{
		removeInfoDiv();
	}
}



//程序初始化

function init(){
	judgeIfCheck(false);
	judgeIfCheckGetInfo(true);
}
init()


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(type == 1){
		judgeIfCheck(request.isCheck)
	}else if(type == 2){
		judgeIfCheckGetInfo(request.isCheck)
	}
	sendResponse({
		fromcontent: "This message is from content.js"
	});
});