const getAnswer = () => {
	try {
		const answer = document.getElementsByClassName("answer-given-body")[0]
			.innerHTML;
		return answer;
	} catch (err) {
		return null;
	}
};

chrome.runtime.onMessage.addListener((request, sender, response) => {
	if (request.command == "get-answer") {
		const transcript = getAnswer();
		response(transcript);
	}
	return true; // To send response asynchronously
});
