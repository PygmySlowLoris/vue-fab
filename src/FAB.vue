<template>
    <div class="fab-wrapper" v-on-clickaway="away" :style="[pos, {zIndex: styles.zIndex}]" >
        <transition name="fab-actions-appear"
                    :enter-active-class="transitionEnter"
                    :leave-active-class="transitionLeave"
        >
            <ul v-show="toggle" class="fab-list">
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
                toggle: false,
                pos: {}
            }
        },
        props: ['styles', 'actions'],
        computed: {
            transitionEnter() {
                let animation = this.animation;
                return animation.enter;
            },
            transitionLeave() {
                let animation = this.animation;
                return animation.leave;
            },
            animation() {
                if (this.styles.position === 'top-right' || this.styles.position === 'top-left') {
                    return {
                        enter: 'animated fadeInDown',
                        leave: 'animated fadeOutUp'
                    };
                } else if (this.styles.position === 'bottom-right' || this.styles.position === 'bottom-left') {
                    return {
                        enter: 'animated fadeInUp',
                        leave: 'animated fadeOutDown'
                    };
                } else {
                    return {
                        enter: 'animated fadeInUp',
                        leave: 'animated fadeOutDown'
                    };
                }
            }
        },
        methods: {
            toParent(name) {
                this.$emit(name);
                this.toggle = false;
            },
            away() {
                this.toggle = false;
            },
            position() {
                this.pos = {}
                switch (this.styles.position) {
                    case 'bottom-right':
                        this.pos.right = '5vw';
                        this.pos.bottom = '4vh';
                        break;
                    case 'bottom-left':
                        this.pos.left = '5vw';
                        this.pos.bottom = '4vh';
                        break;
                    case 'top-left':
                        this.pos.left = '5vw';
                        this.pos.top = '4vh';
                        break;
                    case 'top-right':
                        this.pos.right = '5vw';
                        this.pos.top = '4vh';
                        break;
                    default:
                        this.pos.right = '5vw';
                        this.pos.bottom = '4vh';
                }
            },
            moveTransition() {
                if (this.styles.position === 'top-right' || this.styles.position === 'top-left') {
                    let wrapper = document.getElementsByClassName('fab-wrapper');
                    let el = document.getElementsByClassName('fab-list');
                    wrapper[0].appendChild(el[0]);
                }
            }
        },
        mounted() {
            this.moveTransition();
        },
        created() {
            this.position();
        }
    }
</script>

<style scoped>
    .fab-wrapper {
        position: fixed;
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

    @media screen and (max-width: 768px) {
        .fab-list {
            margin: 1rem 0rem 0.5rem 0.35rem;
        }
        .fab-list li {
            width: 2.6rem;
            height: 2.6rem;
        }
        .fab-list li i {
            font-size: 1.3rem !important;
        }
        .fab {
            width: 3.2rem;
            height: 3.2rem;
        }
        .fab i {
            font-size: 2rem !important;
        }

    }
</style>