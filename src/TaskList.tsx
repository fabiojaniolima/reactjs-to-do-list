import { ClipboardText, PlusCircle } from 'phosphor-react'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import styles from './TaskList.module.css'
import TaskListItem, { Task } from './TaskListItem'

function TaskList() {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState<Task[]>(
    JSON.parse(localStorage.getItem('items') || '[]')
  )

  useEffect(() => {
    if (!items.length) {
      localStorage.removeItem('items')
      return
    }

    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const { totalItems, totalItemsCompleted } = useMemo(() => {
    return {
      totalItems: items.length,
      totalItemsCompleted: items.filter((item) => item.isDone).length,
    }
  }, [items])

  function handleNewItem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setItems([{ id: uuid(), content: newItem, isDone: false }, ...items])
    setNewItem('')
  }

  function handleChangeTaskStatus(id: string) {
    const newItems = items.map((task) => {
      return task.id === id ? { ...task, isDone: !task.isDone } : task
    })

    setItems(newItems)
  }

  function handleDeleteTask(id: string) {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div id="wrapper">
      <form onSubmit={handleNewItem}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          required
        />
        <button type="submit">
          Criar <PlusCircle size={18} />
        </button>
      </form>

      <div className={styles.taskList}>
        <header className={totalItems === 0 ? styles.border : undefined}>
          <p>
            Tarefas criadas <span>{totalItems}</span>
          </p>
          <p>
            Concluídas{' '}
            <span>
              {totalItems === 0 ? 0 : totalItemsCompleted + ' de ' + totalItems}
            </span>
          </p>
        </header>
        <main>
          {items.length === 0 ? (
            <>
              <ClipboardText size={62} />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </>
          ) : (
            <div className={styles.items}>
              {items
                .sort((a, b) => Number(a.isDone) - Number(b.isDone))
                .map((item) => (
                  <TaskListItem
                    key={item.id}
                    {...item}
                    deleteItem={handleDeleteTask}
                    changeItemStatus={handleChangeTaskStatus}
                  />
                ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default TaskList
