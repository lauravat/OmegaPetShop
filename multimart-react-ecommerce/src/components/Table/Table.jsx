import DataTable from 'react-data-table-component'
import { useLocation } from 'react-router-dom'
import './Table.css'

function Table ({ Coluums, Data, title, buttonRegister }) {
  const location = useLocation()
  const customStyles = {
    table: {
      style: {
        margin: '5px'
      }
    },
    head: {
      style: {
        fontWeight: 'Bold',
        fontSize: '15px',
        padding: '10px'
      }
    },
    pagination: {
      style: {
        width: '98%',
        margin: '20px'
      }
    },
    rows: {
      style: {
        padding: '12px',
        fontSize: '14px'
      }
    }
  }
  return (
    <div className='TableContent'>
      <DataTable
        columns={Coluums}
        data={Data}
        subHeader
        subHeaderComponent={
          <div className='header-table'>
            <h2>{title}</h2>
            {location.pathname !== '/Dashboard'
              ? (
                <a className='Button' onClick={buttonRegister}>
                  Añadir {title}
                </a>
                )
              : null}
          </div>
          }
        pagination
        customStyles={customStyles}
      />
    </div>
  )
}

export default Table
