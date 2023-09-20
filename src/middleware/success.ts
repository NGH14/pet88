// success response and return data
const successHandler = (success, req,res,next) => {
	if (process.env.NODE_ENV === "test") return ;

    const status = success.status || "200"
    return res.status(status).json({
      success: true,
      status,
      message: success.message,
      data: success.data,
      has_more: success.has_more ||  false,
      URL: "/api/v1/department/"
    });
  
};

export default successHandler;