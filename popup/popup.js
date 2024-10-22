function judgeIfCheck(isCheck,type) {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id, {
				tabId: tabs[0].id,
				isCheck,
				type
			},
			function(response) {
				// window.close();
			}
		);

	});

	if (isCheck) {
		console.log('Checkbox is now checked.');
		// 在此处添加当复选框被选中时要执行的代码  
	} else {
		console.log('Checkbox is now unchecked.');
		// 在此处添加当复选框被取消选中时要执行的代码  
	}
}

// 监听 load 事件  
window.addEventListener('load', function() {
	console.log('整个页面及所有资源已经加载完成');
	// 在此处放置你的代码，该代码会在所有资源加载完成后执行  
	// 获取checkbox元素  
	var checkbox = document.getElementById('check-5');
	var checkbox_getInfo = document.getElementById('check-getInfo');
	// 手动设置checkbox为选中状态  
	checkbox.checked = false;
	checkbox_getInfo.checked = true;
	// 为checkbox添加change事件监听器  
	checkbox.addEventListener('change', function(event) {
		judgeIfCheck(event.target.checked,1)
	});
	checkbox_getInfo.addEventListener('change', function(event) {
		judgeIfCheck(event.target.checked,2)
	});
});


