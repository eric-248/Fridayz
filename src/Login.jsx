//define function Login
export const Login = () => {
    return (
        <form>

            {/*Email*/}
            <label for="email">Email</label>
            <input type="email" placeholder="abc@gmail.com" id="email" name="email"/>

            {/*Password*/}
            <label for="password">Password</label>
            <input type="email" placeholder="******" id="password" name="pawword"/>
            <button>Log In</button>

        </form>
    )
}