<template>
    <div id="sidebar" class="docs-sidebar column col-2 col-sm-12">
        <ul class="docs-nav nav">
            <li class="nav-item active">
                <a href="/">控制面板</a>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)">Banner管理</a>
                <ul class="nav">
                    <router-link :to="{name: 'banner'}" class="nav-item" tag="li">
                        <a>大轮播管理</a>
                    </router-link>
                </ul>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)">网站设定</a>
                <ul class="nav">
                    <router-link :to="{name: 'meta'}" class="nav-item" tag="li">
                        <a>META及脚本</a>
                    </router-link>
                    <router-link :to="{name: 'info'}" class="nav-item" tag="li">
                        <a>整站联络信息</a>
                    </router-link>
                </ul>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)">权限管理</a>
                <ul class="nav">
                    <router-link :to="{name: 'account'}" class="nav-item" tag="li">
                        <a>账户管理</a>
                    </router-link>
                    <router-link :to="{name: 'group'}" class="nav-item" tag="li">
                        <a>权限群组</a>
                    </router-link>
                </ul>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)">文章中心</a>
                <ul class="nav">
                    <router-link :to="{name: 'edit-tags'}" class="nav-item" tag="li">
                        <a>文章分类</a>
                    </router-link>
                    <router-link :to="{name: 'edit'}" class="nav-item" tag="li">
                        <a>文章列表</a>
                    </router-link>
                </ul>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)">附件管理</a>
                <ul class="nav">
                    <router-link :to="{name: 'attachment'}" class="nav-item" tag="li">
                        <a>附件及媒体库</a>
                    </router-link>
                </ul>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)">联系我们</a>
                <ul class="nav">
                    <router-link :to="{name: 'contact-forms'}" class="nav-item" tag="li">
                        <a>联系我们表单</a>
                    </router-link>

                </ul>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)">4MCMS 内测版 v1.0.0</a>
            </li>
        </ul>
    </div>
</template>