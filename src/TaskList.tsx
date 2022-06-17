import { ClipboardText, PlusCircle } from 'phosphor-react'

import styles from './TaskList.module.css'

function TaskList() {
  return (
    <div id="wrapper">
      <form>
        <input type="text" placeholder="Adicione uma nova tarefa" required />
        <button type="submit">
          Criar <PlusCircle size={18} />
        </button>
      </form>

      <div className={styles.taskList}>
        <header>
          <p>
            Tarefas criadas <span>0</span>
          </p>
          <p>
            Concluídas <span>0</span>
          </p>
        </header>
        <main>
          <ClipboardText size={62} />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
          </p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </main>
      </div>
    </div>
  )
}

export default TaskList
