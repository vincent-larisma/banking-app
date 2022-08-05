import React, { useState } from 'react'

export default function UserDisplay() {
  const [user, setUser] = useState({
    userEmail: '',
    userName: '',
    userBalance: 0,
    userList: [],
  }) //Contains the user input

  const [newUserBalance, setNewUserBalance] = useState({
    userBalanceDeposit: 0,
    userBalanceWithdraw: 0,
    userBalanceTransfer: 0,
    userToTransfer: 0,
    editIndex: '',
  })

  // const [newTransactions, setNewTransactions] = useState({
  //   transactionLogs: '',
  //   logIndex: ''
  // })

  const { editIndex, userBalanceDeposit, userBalanceWithdraw, userBalanceTransfer, userToTransfer } = newUserBalance
  // const { logIndex, transactionLogs} = newTransactions
  // const { isUpdateLogs, setIsUpdateLogs } = useState(false)
  const [isUpdateDeposit, setIsUpdateDeposit] = useState(false)
  const [isUpdateWithdraw, setIsUpdateWithdraw] = useState(false)
  const [isUpdateTransfer, setIsUpdateTransfer] = useState(false)

  //update to true
  const handleClickDeposit = (index) => {
    setIsUpdateDeposit(true)
    setNewUserBalance({ ...newUserBalance, editIndex: index })
    console.log(newUserBalance)
  }

  const handleChangeDepositUpdate = (e) => {
    const { value, name } = e.target
    setNewUserBalance({ ...newUserBalance, [name]: value })
  }

  //update to true
  const handleClickWithdraw = (index) => {
    setIsUpdateWithdraw(true)
    setNewUserBalance({ ...newUserBalance, editIndex: index })
    console.log(newUserBalance)
  }

  const handleChangeWithdrawUpdate = (e) => {
    const { value, name } = e.target
    setNewUserBalance({ ...newUserBalance, [name]: value })
  }

  const handleAmountToTransfer = (e) => {
    const { value, name } = e.target
    setNewUserBalance({ ...newUserBalance, [name]: value })
  }

  const handleUserToTransfer = (e) => {
    const { value, name } = e.target
    setNewUserBalance({ ...newUserBalance, [name]: value })
  }

  const handleClickTransfer = (index) => {
    setIsUpdateTransfer(true)
    setNewUserBalance({ ...newUserBalance, editIndex: index })
    console.log(newUserBalance)
  }

  // const handleClickTransactions = (index) => {
  //   setIsUpdateLogs(true)
  //   setNewTransactions({ ...newTransactions, logIndex: index})
  //   console.log(newTransactions)
  // }

  // const handleUpdateTransactions = (e) => {

  // }

  const { userList, userEmail, userBalance, userName } = user

  //HandleChange function for the user input
  const handleChangeName = (e) => {
    const { value, name } = e.target
    setUser({ ...user, [name]: value })
  }
  const handleChangeEmail = (e) => {
    const { value, name } = e.target
    setUser({ ...user, [name]: value })
  }
  const handleChangeBalance = (e) => {
    const { value, name } = e.target
    setUser({ ...user, [name]: value })
  }
  //Push the user input to userList
  const handleClickCreateUser = () => {
    let list = userList
    const listedUsers = { Name: '', Email: '', Balance: 0, ID: Date.now() }
    //Don't create users if email or name is empty
    if (userName !== '' && userEmail !== '') {
      listedUsers.Name = userName
      listedUsers.Email = userEmail
      listedUsers.Balance = userBalance
      list.push(listedUsers)
      setUser({ ...user, userList: list })
      setUser({ ...user, userName: '', userEmail: '', userBalance: 0 })
      // logHistory(index);
    }
  }
  //Prevent from reloading
  const handleSubmitUser = (e) => {
    e.preventDefault()
  }

  //Delet User Function
  const handleClickDelete = (index) => {
    let list = userList
    list.splice(index, 1)
    setUser({ ...user, userList: list })
    setIsUpdateWithdraw(false)
    setIsUpdateDeposit(false)
  }

  const handleClickNewDeposit = () => {
    let list = userList
    list[editIndex].Balance = parseInt(list[editIndex].Balance) + parseInt(userBalanceDeposit)
    setUser({ ...user, userList: list })
    setIsUpdateDeposit(false)
    // logHistory(index)
  }

  const handleClickNewWithdraw = () => {
    let list = userList
    if (parseInt(list[editIndex].Balance) < parseInt(userBalanceWithdraw)) {
      return false
    } else {
      if (parseInt(userBalanceWithdraw) % 100 === 0) {
        list[editIndex].Balance = parseInt(list[editIndex].Balance) - parseInt(userBalanceWithdraw)
        setUser({ ...user, userList: list })
        setIsUpdateWithdraw(false)
        // logHistory(index)
      } else {
        return false
      }
    }
  }

  const handleClickNewTransfer = () => {
    let list = userList
    //let copyIndex
    let i

    // console.log(list);
    // console.log(userToTransfer)

    // console.log(userBalanceTransfer)
    // console.log(list[editIndex].Balance)
    if (list.length === 0) {
      console.log('no users yet')
      return false // no users yet
    }
    if (list.length === 1) {
      console.log('only 1 user, no one to transfer to')
      return false
    }
    if (parseInt(list[editIndex].Balance) < parseInt(userBalanceTransfer)) {
      console.log('Not Enough Balance')
      return false
    }

    for (i = 0; i < list.length; i++) {
      if (parseInt(list[i].ID) === parseInt(userToTransfer)) {
        list[editIndex].Balance = parseInt(list[editIndex].Balance) - parseInt(userBalanceTransfer)
        list[i].Balance = parseInt(list[i].Balance) + parseInt(userBalanceTransfer)
        console.log(list[editIndex].Balance)
        console.log(list[i].Balance)
      }
    }

    i = 0
    setIsUpdateTransfer(false)
  }

  return (
    <>
      <div className='grid'>
        <div className='container notification'>
          <div className='subtitle'>
            <span className='icon-text'>
              <span className='icon'>
                <i className='fa-solid fa-user'></i>
              </span>
              <span>Total Users</span>
            </span>
          </div>
          <div className='title flex-center'>{userList.length}</div>
        </div>
        <div className='box container grid-create-user form-size'>
          <h2 className='subtitle text-center'>Create User</h2>
          <form onSubmit={handleSubmitUser}>
            <div className='field pl-4'>
              <label className='label'>Name:</label>
              <input type='text' name='userName' value={userName} required onChange={handleChangeName} />
            </div>
            <div className='field pl-4'>
              <label className='label'>Email:</label>
              <input type='email' name='userEmail' value={userEmail} required onChange={handleChangeEmail} />
            </div>

            <div className='field pl-4 balance-input'>
              <label className='label'>Balance:</label>
              <input type='number' name='userBalance' value={userBalance} onChange={handleChangeBalance} />
              <span>(Optional)</span>
            </div>
            <button className='ml-4 button is-success is-small' type='submit' onClick={handleClickCreateUser}>
              Create User
            </button>
          </form>
        </div>

        <table className='table table is-bordered is-striped is-narrow is-hoverable is-fullwidth grid-table '>
          <caption>
            {' '}
            <h1 className='title m-4'>Bank Users</h1>
          </caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Displays the userList  */}
            {userList.length ? (
              userList.map(({ Name, Email, Balance, ID }, index) => {
                return (
                  <tr key={index}>
                    <td>{Name}</td>
                    <td>{ID}</td>
                    <td>{Email}</td>
                    <td>${Balance}</td>
                    <td>
                      <button className='button is-primary m-1' onClick={() => handleClickWithdraw(index)}>
                        Withdraw
                      </button>
                      <button className='button is-primary m-1' onClick={() => handleClickDeposit(index)}>
                        Deposit
                      </button>
                      <button className='button is-primary m-1' onClick={() => handleClickTransfer(index)}>
                        TRANSFER
                      </button>
                      <button className='button is-danger m-1' onClick={() => handleClickDelete(index)}>
                        DELETE USER
                      </button>
                      {/* <button onClick={() => handleClickTransactions(index)}>Transactions</button> */}
                    </td>
                  </tr>
                )
              })
            ) : (
              <th
                colSpan='5'
                className='table-size subtitle'
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingTop: '50%',
                }}>
                No Users Yet
              </th>
            )}
          </tbody>
        </table>
        {isUpdateDeposit && (
          <div>
            <span>
              {userList[editIndex].Name} {userList[editIndex].ID}
            </span>
            <input
              type='number'
              name='userBalanceDeposit'
              value={userBalanceDeposit}
              onChange={handleChangeDepositUpdate}
            />
            <button onClick={handleClickNewDeposit}>Deposit</button>
          </div>
        )}
        {isUpdateWithdraw && (
          <div>
            <span>
              {userList[editIndex].Name} {userList[editIndex].ID}
            </span>
            <input
              type='number'
              name='userBalanceWithdraw'
              value={userBalanceWithdraw}
              onChange={handleChangeWithdrawUpdate}
            />
            <button onClick={handleClickNewWithdraw}>Withdraw</button>
          </div>
        )}
        {isUpdateTransfer && (
          <div>
            <span>
              {userList[editIndex].Name} {userList[editIndex].ID}
            </span>
            <input type='number' name='userToTransfer' value={userToTransfer} onChange={handleUserToTransfer} />
            <input
              type='number'
              name='userBalanceTransfer'
              value={userBalanceTransfer}
              onChange={handleAmountToTransfer}
            />
            <button onClick={handleClickNewTransfer}>Transfer</button>
          </div>
        )}
      </div>
    </>
  )
}
