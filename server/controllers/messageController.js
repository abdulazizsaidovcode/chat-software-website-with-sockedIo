import messageCollection from "../model/messageModel.js";

export const addMessage = async (req, res, next) => {
  try {
    const {from,to,message}=req.body;
    const data=await messageCollection.create({
        message:{text:message},
        users:[from,to],
        sender:from
    })
    if(data) return res.json({msg:"Message sent successfully"})
    return res.json({msg:"Message failed to send"})
  } catch (e) {
    next(e);
  }
};

export const getAllMessages = async (req, res, next) => {
    try {
        const {from,to}=req.body;
        const messages=await messageCollection.find({
            users:{$all:[from,to]}
        }).sort({updatedAt:1});
        const projectedMessages=messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text
            }
        });
        res.json(projectedMessages)
    } catch (e) {
      next(e);
    }
  };
