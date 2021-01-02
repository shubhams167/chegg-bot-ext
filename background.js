const socket = io("https://bot.shubhamsingh14.repl.co");

socket.on("get-question", async (...args) => {
	const link = args[0];
	const cb = args[1];
	const answer = await getAnswer(link);
	cb(answer);
});

const getCurrentTab = () => {
	return new Promise((resolve, reject) => {
		chrome.tabs.getSelected(tab => {
			if (tab) resolve(tab);
			reject(null);
		});
	});
};

const sendMessageToTab = async (request, tabId) => {
	return new Promise((resolve, reject) => {
		const listener = (tid, changeInfo, tab) => {
			if (tid === tabId && changeInfo.status == "complete") {
				chrome.tabs.onUpdated.removeListener(listener);
				chrome.tabs.sendMessage(tabId, request, response => {
					if (!response) {
						reject(response);
					}
					resolve(response);
				});
			}
		};
		chrome.tabs.onUpdated.addListener(listener);
	});
};

const getAnswer = async link => {
	const tab = await getCurrentTab();
	// Open question link
	chrome.tabs.update(tab.id, { url: link });
	try {
		const answer = await sendMessageToTab({ command: "get-answer" }, tab.id);
		return answer;
	} catch (err) {
		return null;
	}
};
