import React, { useState } from 'react'
import Modal from './Modal'
import Clock from './Clock'

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

  const { editIndex, userBalanceDeposit, userBalanceWithdraw, userBalanceTransfer, userToTransfer } = newUserBalance

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

  const { userList, userEmail, userBalance, userName } = user

  const [depositModal, setDepositModal] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [transferModal, setTransferModal] = useState(false)

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
      if (!userList.some(emailChecker)) {
        listedUsers.Name = userName
        listedUsers.Email = userEmail
        listedUsers.Balance = userBalance
        list.push(listedUsers)
        setUser({ ...user, userList: list })
        setUser({ ...user, userName: '', userEmail: '', userBalance: 0 })
      } else if (userList.some(emailChecker)) {
        alert(`Email ${userEmail} is already in use`)
      }
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

  const handleClickNewDeposit = (value) => {
    let list = userList
    list[editIndex].Balance = parseInt(list[editIndex].Balance) + value
    setUser({ ...user, userList: list })
    setIsUpdateDeposit(false)
    console.log('edit index', editIndex)
  }

  const handleClickNewWithdraw = (value) => {
    console.log('withdraw clicked')
    let list = userList

    if (parseInt(list[editIndex].Balance) < value ) {
      return false
    } else {
      if (parseInt(userBalanceWithdraw) % 100 === 0) {
        list[editIndex].Balance = parseInt(list[editIndex].Balance) - value
        setUser({ ...user, userList: list })
        setIsUpdateWithdraw(false)
      } else {
        return false
      }
    }
  }
  const handleClickNewTransfer = (value) => {
    let list = userList
    let i

    console.log(1)
    if (list.length === 0) {
      console.log('no users yet')
      return false // no users yet
    }
    if (list.length === 1) {
      console.log('only 1 user, no one to transfer to')
      return false
    }
    if (parseInt(list[editIndex].Balance) < value) {
      console.log('Not Enough Balance')
      return false
    }

    for (i = 0; i < list.length; i++) {
      if (parseInt(list[i].ID) === parseInt(userToTransfer)) {
        list[editIndex].Balance = parseInt(list[editIndex].Balance) - value
        list[i].Balance = parseInt(list[i].Balance) + value
        console.log(list[editIndex].Balance)
        console.log(list[i].Balance)
      }
    }

    i = 0
    setIsUpdateTransfer(false)
  }

  const toggleDepositModal = (index) => {
    setNewUserBalance({ ...newUserBalance, editIndex: index })
    setDepositModal(!depositModal)
  }
  const toggleWithdrawModal = (index) => {
    setNewUserBalance({ ...newUserBalance, editIndex: index })
    setWithdrawModal(!withdrawModal)
  }
  const toggleTransferModal = (index) => {
    setNewUserBalance({ ...newUserBalance, editIndex: index })
    setTransferModal(!transferModal)
  }


  const emailChecker = (object) => {
    return object.Email === userEmail
  }

  return (
    <>
      <Modal
        method='deposit'
        isOpen={depositModal}
        toggleModal={toggleDepositModal}
        handleClickNewDeposit={handleClickNewDeposit}
      />
      <Modal
        method='withdraw'
        isOpen={withdrawModal}
        toggleModal={toggleWithdrawModal}
        handleClickNewWithdraw={handleClickNewWithdraw}
      />
      <Modal
        method='transfer'
        isOpen={transferModal}
        toggleModal={toggleTransferModal}
        handleClickNewTransfer={handleClickNewTransfer}
      />
  
      <div className='grid'>
        <div className='container notification mt-3'>
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
        <div className='container notification mt-3 grid-clock '>
          <div className='subtitle text-center'>
            <span class='icon-text'>
              <span class='icon'>
                <i class='fa-solid fa-clock'></i>
              </span>
              <span>Clock</span>
            </span>
            <div className='mt-2'>
              <Clock />
            </div>
          </div>
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

        <table className='table table-size table is-bordered is-striped is-narrow is-hoverable is-fullwidth grid-table mb-6'>
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
                      <button className='button is-primary m-1' onClick={() => toggleWithdrawModal(index)}>
                        Withdraw
                      </button>
                      <button className='button is-primary m-1' onClick={() => toggleDepositModal(index)}>
                        Deposit
                      </button>
                      <button className='button is-primary m-1' onClick={() => toggleTransferModal(index)}>
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
    </>
  )
}
