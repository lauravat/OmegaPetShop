import Table from '../components/Table/Table'
import { useContext, useEffect, useState } from 'react'
import Modal from '../layout/modal'
import useWindowScrollToTop from '../hooks/useWindowScrollToTop'

import { UserContext } from '../context/UserContext'
import { useModal } from '../hooks/useModal'
import { GetCategoryByStore } from '../api/category'
import UpdateCategory from '../Form/Category/UpdateCategory'
import RegisterCategory from '../Form/Category/RegisterCategory'
function MyCategory () {
  const { Open: ModalRegister, ToggleState: toggleModalRegister } = useModal()
  const { Open: ModalUpdate, ToggleState: toggleModalUpdate } = useModal()
  const [Id, setId] = useState(null)

  const [Products, setProducts] = useState([])

  const { User } = useContext(UserContext)

  const userColumns = [
    {
      name: 'Nombre Categoria',
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: 'Descripcion',
      selector: (row) => row.description,
      sortable: true
    },
    {
      name: 'Modificar',
      button: 'true',
      cell: (row) => (
        <a className='Button' onClick={(e) => handleEdit(e, row._id)}>
          Editar
        </a>
      )
    }
  ]

  const handleEdit = (e, id) => {
    toggleModalUpdate()
    setId(id)
  }

  useEffect(() => {
    console.log(User._id)
    GetCategoryByStore(User._id)
      .then(response => {
        console.log(response)
        setProducts(response.data.categories || [])
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error)
      })
  }, [User._id])

  console.log(Products)
  console.log(Id)

  useWindowScrollToTop()
  return (
    <section>
      <Table
        title='Categorias'
        Coluums={userColumns}
        Data={Products}
        buttonRegister={() => toggleModalRegister()}
      />
      {ModalRegister &&
        <Modal CloseModal={toggleModalRegister}>
          <RegisterCategory />
        </Modal>}
      {ModalUpdate &&
        <Modal CloseModal={toggleModalUpdate}>
          <UpdateCategory id={Id} />
        </Modal>}
    </section>
  )
}

export default MyCategory
