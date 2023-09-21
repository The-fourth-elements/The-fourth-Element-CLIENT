import estado from zustand
const Filters = () => {

    const {allUsers} = estado()
    const {orderUsersName, orderUsersCountry, orderUsersPlan, filterUsersPlan, filterUserCountry} = estado()
    return(
        <>
            <label htmlFor="">FILTER BY COUNTRY</label>
            <select >
                {allUsers.map ((user) => (
                    <option value={user.nationality} key={user.nationality} >{user.nationality}</option>
                ))}
            </select>

            <label htmlFor="">FILTER BY PLAN</label>
            <select name="" id=""></select>

        </>
    )
}