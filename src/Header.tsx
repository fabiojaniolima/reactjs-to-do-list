import rocketIcon from './assets/rocket.svg'

function Header() {
  return (
    <header id="header">
      <img src={rocketIcon} alt="Icone de foguete" />
      <span>to</span>
      <span>do</span>
    </header>
  )
}

export default Header
