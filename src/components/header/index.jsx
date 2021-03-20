import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import {Modal} from "antd";

import LinkButton from "../link-button";
import {reqWeather} from "../../api";
import menuList from "../../config/menuConfig";
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from "../../utils/storageUtils";
import './index.less'

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        wea_img: '',
        wea: ''
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    getWeather = async () => {
        const {wea_img, wea} = await reqWeather('三门峡')
        this.setState({wea_img, wea})
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            }else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key===path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = () => {
        Modal.confirm({
            content: '确定要退出吗？',
            onOk: () => {
                // console.log('确定');
                storageUtils.removeUser()
                memoryUtils.user = {}

                this.props.history.replace('/login')
            },
        })
    }

    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        const {currentTime, wea_img, wea} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <LinkButton onClick={this.logout} >退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                       <img src={"/images/" + wea_img + ".gif"}
                            alt="weather" />
                        <span>{wea}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)