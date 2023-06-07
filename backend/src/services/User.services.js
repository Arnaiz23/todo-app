async function checkUserExists({ con, user_id }) {
	try {
		const [user] = await con.query(
			`SELECT DISTINCT user_id FROM todos WHERE user_id LIKE ?`,
			[user_id]
		)

		if (typeof user[0] === "undefined") {
			throw new Error("This user doesn't exists")
		}

		return true
	} catch (err) {
		console.log(err.message)
		return false
	}
}

export { checkUserExists }
