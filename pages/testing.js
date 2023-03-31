import { useEffect, useState } from "react";

const Voting = () => {
  //use state is a react hook for capturing state. it returns the state and a setter for the state as you can see in the destructured array
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const upvote = () => {
    setDownvoted(false);
    setUpvoted(!upvoted); // we dont set this to true because if its already true we want it to get set to false therefore we just set it to the opposite of itself
  };
  const downvote = () => {
    setUpvoted(false);
    setDownvoted(!downvoted);
  };

  const callAPI = () => {
    fetch(
      `https://yourapi.com/upvote+upvote=${
        upvoted ? "true" : "false"
      }&downvote=${downvoted ? "true" : "false"}`
    );
  };

  // a useeffect will watch the two variables (upvoted and downvoted) for state changes. once they change from a user click if either is true then we send a api call
  useEffect(() => {
    if (upvoted || downvoted) {
      callAPI();
    }
  }, [upvoted, downvoted]);

  // Then render with ternary operators and put on click attributes on the parent divs
  return (
    <>
      <div onClick={() => upvote()}>
        {upvoted ? <UpvoteColoredComponent /> : <UpvoteStandardComponent />}
      </div>
      <div onClick={() => downvote()}>
        {downvoted ? (
          <DownvoteColoredComponent />
        ) : (
          <DownvoteStandardComponent />
        )}
      </div>
    </>
  );
};

export default Voting;
