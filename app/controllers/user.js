module.exports = {
    create: async (ctx, next) => {
        console.log(ctx.request.body)
        const {
            username,
            email,
            password
        } = ctx.request.body
        
        const save = await Models.user.create({ username, email, password }).catch(e => e)
        if (save.errors) {
            ctx.body = save.errors
        }else {
            ctx.body = save
        }
    }
}