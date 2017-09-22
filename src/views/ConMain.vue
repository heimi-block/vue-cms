<template>
  <div>
    <top-bar></top-bar>
    <section class="container">
      <section class="columns">
        <!--Sidebar 左侧导航栏-->
        <side-bar></side-bar>
        <a href="#sidebar-close" id="sidebar-close" class="docs-nav-clear"></a>

        <!--Sidebar 右侧内容区 開始-->
<div class="docs-content column col-10 col-sm-12 centered">
        <section id="compiling" class="container" style="margin-top: 80px">
            <header class="text-center">
                <h3>控制面板</h3>
            </header>
         <div class="columns">
                    <div class="column col-8 col-xs-12">
                        <div class="column col-12 col-xs-12">
                            <ul class="menu" style="height:487px;">
                                <li class="menu-item">
                                    <div class="tile tile-centered">
                                        <div class="tile-icon">
                                            <img src="./../assets/img/google.png" class="avatar app-avatar">
                                        </div>
                                        <div class="tile-content">
                                            Google Analytics 数据报表
                                        </div>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <!-- <figure  display: block; height: 400px;" id="chart-example"></figure> -->
                                       <commitChart  :width="420" :height="400"></commitChart>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="column col-4 col-xs-12">
                        <div class="column col-12 col-xs-12">
                            <ul class="menu">
                                <li class="menu-item">
                                    <div class="tile tile-centered">
                                        <div class="tile-icon">
                                            <img src="./../assets/img/server.png" class="avatar app-avatar" >
                                        </div>
                                        <div class="tile-content">
                                            系统信息
                                        </div>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">https://cms.4-m.cn</label>
                                    </div>
                                    <a href="" class="active">
                                        当前网站
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">4MCloudServer v1.0.0</label>
                                    </div>
                                    <a href="" class="active">
                                        程序信息
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">Ubuntu 16.04 Server</label>
                                    </div>
                                    <a href="" class="active">
                                        操作系统
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">Node v7.6.0</label>
                                    </div>
                                    <a href="" class="active">
                                        引擎版本
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">MongoDB v3.2.1</label>
                                    </div>
                                    <a href="" class="active">
                                        数据库版本
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="column col-12 col-xs-12">
                            <ul class="menu">
                                <li class="menu-item">
                                    <div class="tile tile-centered">
                                        <div class="tile-icon">
                                            <img src="./../assets/img/vip.png" class="avatar app-avatar">
                                        </div>
                                        <div class="tile-content">
                                            您的特权
                                        </div>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">基础版</label>
                                    </div>
                                    <a href="" class="active">
                                        套餐版本
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">2017-08-14 12:30</label>
                                    </div>
                                    <a href="" class="active">
                                        购买日期
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">2018-08-14 12:30</label>
                                    </div>
                                    <a href="" class="active">
                                        到期时间
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">未购买</label>
                                    </div>
                                    <a href="" class="active">
                                        数据备份
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <div class="menu-badge">
                                        <label class="label label-primary">未购买</label>
                                    </div>
                                    <a href="" class="active">
                                        基础维护
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
</section>
</div>
        <!--Sidebar 右侧内容区 結束-->
      </section>
    </section>
  </div>
</template>

<script>
import TopBar from './../components/TopBar'
import SideBar from './../components/SideBar'
import CommitChart from './../assets/js/newChart'

export default {
  components: {
    TopBar,
    SideBar,
    CommitChart
  }
}

</script>

<style scoped>
.avatar {
    background: #ffffff; 
    border-radius: 0;
}
</style>