<template>
    <div class="fab-wrapper" v-on-clickaway="away">
        <transition name="fab-actions-appear"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
        >
            <ul v-if="toggle" class="fab-list">
                <li v-for="action in actions" v-bind:style="{ 'background-color': styles.bgColor }"
                    v-on:click="toParent(action.name)" class="pointer">
                    <i class="material-icons">{{action.icon}}</i>
                </li>
            </ul>
        </transition>
        <div @click="toggle = !toggle"
             class="fab pointer" v-bind:style="{ 'background-color': styles.bgColor }"
        >
            <i class="material-icons md-36" v-bind:class="{ rotate: toggle }">add</i>
        </div>
    </div>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway';

    export default {
        mixins: [clickaway],
        data() {
            return {
                toggle: false
            }
        },
        props: ['styles', 'actions'],
        methods: {
            toParent(name) {
                this.$emit(name);
                this.toggle = false;
            },
            away() {
                this.toggle = false;
            }
        }
    }
</script>

<style scoped>
    .fab-wrapper {
        position: absolute;
        bottom: 3rem;
        right: 3rem;
        z-index: 999;
    }

    .fab {
        border-radius: 100px;
        width: 4rem;
        position: relative;
        overflow: hidden;
        height: 4rem;
        display: flex;
        align-items: center;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }

    .fab .material-icons {
        color: white;
        -webkit-transition: .4s all;
        -moz-transition: .4s all;
        transition: .4s all;
        margin: 0px auto;
    }

    .fab .material-icons.rotate {
        -ms-transform: rotate(135deg); /* IE 9 */
        -webkit-transform: rotate(135deg); /* Chrome, Safari, Opera */
        transform: rotate(135deg);
    }

    .fab-list {
        position: relative;
        z-index: 9999;
        margin: 1rem .5rem;
    }

    .fab-list li {
        width: 3rem;
        height: 3rem;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        border-radius: 100px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }

    .fab-list li .material-icons {
        color: white;
        margin: 0px auto;
    }
</style>