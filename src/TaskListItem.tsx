import { Trash } from 'phosphor-react'

import styles from './TaskListItem.module.css'

export type Task = {
  id: string
  content: string
  isDone: boolean
}

interface TaskProps extends Task {
  deleteItem: (id: string) => void
  changeItemStatus: (id: string) => void
}

function TaskListItem(props: TaskProps) {
  const { id, content, isDone, deleteItem, changeItemStatus } = props

  return (
    <div className={styles.item}>
      <div className={styles.round}>
        <input
          id={'checkbox' + id}
          type="checkbox"
          onChange={() => changeItemStatus(id)}
          defaultChecked={isDone}
        />
        <label htmlFor={'checkbox' + id} />
      </div>
      <p className={isDone ? styles.isDone : undefined}>{content}</p>
      <button onClick={() => deleteItem(id)}>
        <Trash size={20} />
      </button>
    </div>
  )
}

export default TaskListItem
