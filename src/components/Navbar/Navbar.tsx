import * as React from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import { Mana } from '../Mana/Mana'
import { Blockie } from '../Blockie/Blockie'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import { Mobile, NotMobile } from '../Media'
import './Navbar.css'

export type NavbarI18N = {
  menu: {
    marketplace: React.ReactNode
    docs: React.ReactNode
    events: React.ReactNode
    agora: React.ReactNode
    dao: React.ReactNode
    blog: React.ReactNode
    builder: React.ReactNode
  }
  account: {
    signIn: React.ReactNode
    connecting: React.ReactNode
  }
}

export type NavbarProps = {
  mana?: number
  address?: string
  activePage?:
    | 'marketplace'
    // | 'docs'
    // | 'events'
    // | 'agora'
    // | 'dao'
    // | 'blog'
    | 'builder'
    | string
  leftMenu?: React.ReactNode
  middleMenu?: React.ReactNode
  rightMenu?: React.ReactNode
  i18n?: NavbarI18N
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
  isFullscreen?: boolean
  isOverlay?: boolean
  className?: string
  onSignIn?: () => void
  onClickAccount?: () => void
  isFullWidth?: boolean
}

export type NavbarState = {
  toggle: boolean
}

export class Navbar extends React.PureComponent<NavbarProps, NavbarState> {
  static defaultProps: Partial<NavbarProps> = {
    mana: null,
    address: null,
    activePage: null,
    leftMenu: null,
    middleMenu: null,
    i18n: {
      menu: {
        marketplace: 'Marketplace',
        docs: 'Docs',
        events: 'Events',
        agora: 'Agora',
        dao: 'DAO',
        blog: 'Blog',
        builder: 'Builder'
      },
      account: {
        signIn: 'Sign In',
        connecting: 'Connecting...'
      }
    },
    isConnected: false,
    isConnecting: false,
    isFullscreen: false,
    isOverlay: false,
    isSignIn: false,
    onSignIn: null,
    onClickAccount: null,
    isFullWidth: false
  }
  public state = {
    toggle: false
  }
  componentDidMount(): void {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.handleDocumentClick)
  }
  handleToggle = (event: React.MouseEvent): void => {
    this.setState({ toggle: !this.state.toggle })
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }
  handleDocumentClick = (): void => {
    this.setState({ toggle: false })
  }

  renderLeftMenu(): React.ReactNode {
    const { activePage, i18n, leftMenu } = this.props
    if (leftMenu) {
      return leftMenu
    }
    return (
      <>
        <Menu.Item
          active={activePage === 'lean'}
          href="https://docs.birdezgang.com/welcome-to-gitbook/birdez-kingdom-metaverse-nfts/birdez-kingdom-nfts"
        >
          Learn more
        </Menu.Item>
        <Menu.Item
          active={activePage === 'map'}
          href="https://birdezkingdom.com/maps"
        >
          Kingdom Map
        </Menu.Item>
        <Menu.Item
          active={activePage === 'marketplace'}
          href="https://market.birdezkingdom.com"
        >
          {i18n.menu.marketplace}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'builder'}
          href="https://builder.birdezkingdom.com"
        >
          {i18n.menu.builder}
        </Menu.Item>
        {/* <a href="https://opensea.io/collection/birdez-kingdom" className="item">
          <i className="social-icon opensea" />
        </a>
        <a href="https://www.instagram.com/birdezgang" className="item">
          <i className="social-icon instagram" />
        </a>
        <a href="https://twitter.com/BirdezGang" className="item">
          <i className="social-icon twitter" />
        </a>
        <a href="https://discord.gg/birdezgang" className="item">
          <i className="social-icon discord" />
        </a> */}

        {/* <Menu.Item
          active={activePage === 'docs'}
          href="https://docs.decentraland.org"
        >
          {i18n.menu.docs}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'events'}
          href="https://events.decentraland.org"
        >
          {i18n.menu.events}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'dao'}
          href="https://dao.decentraland.org"
        >
          {i18n.menu.dao}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'blog'}
          href="https://birdezkingdom.com/blog"
        >
          {i18n.menu.blog}
        </Menu.Item> */}
      </>
    )
  }

  renderRightMenu(): React.ReactNode {
    const {
      rightMenu,
      middleMenu,
      isConnected,
      onClickAccount,
      mana,
      address,
      isConnecting,
      isSignIn,
      i18n,
      onSignIn
    } = this.props
    if (rightMenu) {
      return rightMenu
    } else if (isConnected) {
      return (
        <>
          {middleMenu ? (
            <NotMobile>
              <Menu secondary className="dcl navbar-account-menu">
                {middleMenu}
              </Menu>
            </NotMobile>
          ) : null}
          <span
            className={`dcl account-wrapper ${
              onClickAccount ? 'clickable' : ''
            }`}
            onClick={onClickAccount}
          >
            {mana != null ? (
              <Mana size="small" title={`${mana.toLocaleString()} MANA`}>
                {Number(mana.toFixed(2)).toLocaleString()}
              </Mana>
            ) : null}
            {address != null ? <Blockie seed={address} /> : null}
          </span>
        </>
      )
    } else if (isConnecting && !isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item className="sign-in-button" disabled>
            {i18n.account.connecting}
          </Menu.Item>
        </Menu>
      )
    } else if (onSignIn || isSignIn) {
      return (
        <Menu secondary>
          <Button className="sign-in-button" onClick={onSignIn}>
            {/* {i18n.account.signIn} */}
            Connect Wallet
          </Button>
        </Menu>
      )
    } else {
      return null
    }
  }

  render(): JSX.Element {
    const {
      activePage,
      className,
      isSignIn,
      isFullscreen,
      isOverlay,
      isFullWidth
    } = this.props

    let classes = `dcl navbar`

    if (this.state.toggle) {
      classes += ' open'
    }

    if (isSignIn) {
      classes += ' sign-in'
    }

    if (isFullscreen) {
      classes += ' fullscreen'
    }

    if (isOverlay) {
      classes += ' overlay'
    }

    if (className) {
      classes += ` ${className}`
    }

    return (
      <div className={classes} role="navigation">
        <Container className={isFullWidth ? 'full-width' : ''}>
          <div className="dcl navbar-menu">
            <NotMobile>
              <Menu secondary stackable>
                <a
                  className="dcl navbar-title"
                  href="https://birdezkingdom.com"
                >
                  birdez kingdom
                </a>
                <span className="dcl navbar-line"></span>
                {this.renderLeftMenu()}
              </Menu>
            </NotMobile>
            <Mobile>
              <div className="dcl navbar-mobile-menu">
                <a className="dcl navbar-logo" href="https://birdezkingdom.com">
                  <Logo />
                </a>
                <Header
                  size="small"
                  className={`dcl active-page ${
                    this.state.toggle ? 'caret-up' : 'caret-down'
                  }`}
                  onClick={this.handleToggle}
                >
                  {activePage}
                </Header>
              </div>
            </Mobile>
          </div>

          <div className="dcl navbar-account">{this.renderRightMenu()}</div>
        </Container>
        <div className="mobile-menu">{this.renderLeftMenu()}</div>
      </div>
    )
  }
}
