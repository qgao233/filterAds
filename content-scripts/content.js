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
            -webkit-filter: grayscale(100%);  
            filter: grayscale(100%);  
        }  
    `;  
      
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

function init(){
	judgeIfCheck(true)
}
init()


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	judgeIfCheck(request.isCheck)
	sendResponse({
		fromcontent: "This message is from content.js"
	});
});