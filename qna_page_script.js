const getAnswer = () => {
	try {
		// Get question
		const question = document.querySelector(".question-body-text").innerHTML;

		// Get number of likes and dislikes
		let likes = document.querySelector(".up-count")?.innerHTML;
		if (!likes) likes = "0";
		let dislikes = document.querySelector(".down-count")?.innerHTML;
		if (!dislikes) dislikes = "0";

		// Get answer
		const answer = document.querySelector(".answer-given-body").innerHTML;

		const html = `	<h2><u>QUESTION</u></h2>
						<div style='border-radius: 1px solid black; background-color: lightblue; border: 2px solid black; padding: 5px;'>
							${question}
						</div>
						<br>
						<h2><u>STATS</u></h2>
						<div style='border-radius: 1px solid black; border: 2px solid black; padding: 5px;'>
							<h3>Likes: ${likes} Dislikes: ${dislikes}</h3>
						</div>
						<br>
						<h2><u>ANSWER</u></h2>
						<div style='border-radius: 1px solid black; background-color: lightyellow; border: 2px solid black; padding: 5px;'>
							${answer}
						</div>
						`;

		return html;
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
