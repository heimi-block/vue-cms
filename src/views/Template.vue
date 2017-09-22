<template>
  <div>
    <top-bar></top-bar>
    <section class="container">
      <section class="columns">
        <!--Sidebar 左侧导航栏-->
        <side-bar></side-bar>
        <a href="#sidebar-close" id="sidebar-close" class="docs-nav-clear"></a>

        <!--Sidebar 右侧内容区 開始-->

        <!--Sidebar 右侧内容区 結束-->
      </section>
    </section>
  </div>
</template>

<script>
import TopBar from './../components/TopBar'
import SideBar from './../components/SideBar'
  components: {
    TopBar,
    SideBar
  }
</script>
