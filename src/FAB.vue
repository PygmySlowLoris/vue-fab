<template>
    <div class="fab-wrapper" v-on-clickaway="away" :style="[pos, {zIndex: styles.zIndex}]" >
        <div class="actions-container" :style="listPos">
            <transition name="fab-actions-appear"
                        :enter-active-class="transitionEnter"
                        :leave-active-class="transitionLeave"
            >
                <ul v-show="toggle" class="fab-list">
                    <li v-for="action in actions" :style="{ 'background-color': styles.bgColor }"
                        @click="toParent(action.name)" class="pointer">
                        <i class="material-icons">{{action.icon}}</i>
                    </li>
                </ul>
            </transition>
        </div>
        <div @click="toggle = !toggle"
             class="fab pointer" :style="{ 'background-color': styles.bgColor }"
        >
            <i class="material-icons md-36" :class="{ rotate: toggle }">add</i>
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
            listPos() {
                let mask = {};
                if (this.styles.position === 'top-right' || this.styles.position === 'top-left') {
                    return mask = {
                        top: '-20px',
                        paddingTop: '20px'
                    }
                } else {
                    return mask = {
                        bottom: '-20px',
                        paddingBottom: '20px'
                    }
                }
            },
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
                this.pos = {};
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
                    let el = document.getElementsByClassName('actions-container');
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
        width: 65px;
        position: relative;
        overflow: hidden;
        height: 65px;
        display: flex;
        align-items: center;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        z-index: 2;
    }

    .fab .material-icons {
        color: white;
        -webkit-transition: .4s all;
        -moz-transition: .4s all;
        transition: .4s all;
        margin: 0px auto;
    }

    .fab .material-icons.rotate {
        -ms-transform: rotate(315deg); /* IE 9 */
        -webkit-transform: rotate(315deg); /* Chrome, Safari, Opera */
        transform: rotate(315deg);
    }

    .fab-list {
        position: relative;
        z-index: 1;
        margin: 2vh 0.5vw;
    }

    .fab-list li {
        width: 50px;
        height: 50px;
        margin-top: 2vh;
        display: flex;
        align-items: center;
        border-radius: 100px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }

    .fab-list li .material-icons {
        color: white;
        margin: 0px auto;
    }

    .pointer {
        cursor: pointer;
    }

    .fab ul {
        padding: 0;
    }

    .fab-wrapper .actions-container {
        overflow: hidden;
        z-index: 0;
        position: relative;
    }

    /* Rules for sizing the icon. */
    .material-icons.md-18 { font-size: 18px; }
    .material-icons.md-24 { font-size: 24px; }
    .material-icons.md-36 { font-size: 36px; }
    .material-icons.md-48 { font-size: 48px; }

    /* Rules for using icons as black on a light background. */
    .material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
    .material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

    /* Rules for using icons as white on a dark background. */
    .material-icons.md-light { color: rgba(255, 255, 255, 1); }
    .material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }

    @media screen and (max-width: 768px) {
        .fab-list {
            margin: 2vh 1.8vw;
        }
        .fab-list li {
            width: 40px;
            height: 40px;
        }
        .fab-list li i {
            font-size: 24px !important;
        }
        .fab {
            width: 55px;
            height: 55px;
        }
        .fab i {
            font-size: 34px !important;
        }

    }
</style>