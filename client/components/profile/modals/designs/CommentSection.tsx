import React from "react";
import useProfile from "../../../../hooks/profile/useProfile";
import "../../../../styles/profile/social.css";

const commentArr = ["John Doe", "Billy Bob", "Mark Hamtil", "Tony Bert", "William Mont", "David Roe", "Roe Jones", "John Max"];

const CommentSection = function() {
  const { avatar } = useProfile();

  return (
    <section className="comment-section">
      {commentArr.map((elem, ind) => {
        return (
        <div key={ind} className="comment-wrapper">
          <div className="comment-header">
            <div className="comment-img-wrapper">
              <img className="comment__img" src={avatar} />
            </div>
            <h5 className="comment__name">
              {elem}
            </h5>
          </div>
          <div className="comment__content">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </div>
          <div className="comment-icon-wrapper"></div>
      </div>);
      })}

      
    </section>
  );
}


export default CommentSection;