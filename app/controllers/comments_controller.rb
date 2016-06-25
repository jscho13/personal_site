class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    
    # TODO: This block needs to become a one-liner
    @comment = Comment.new
    @comment.post_id = @post.id
    @comment.body = params[:comment][:body]
    @comment.save
    
    redirect_to @post
  end
end
