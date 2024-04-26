
import styles from './not_found.module.scss'
import notFound from '../../../assets/images/notFound.gif'

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <p >No Such Product ! </p>

      <img src={notFound} alt="notFoundGif" />
    </div>
  )
}

export default NotFound