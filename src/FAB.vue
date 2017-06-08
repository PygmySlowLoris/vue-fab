<template>
    <div :id="position + '-wrapper'" class="fab-wrapper" v-on-clickaway="away"
         :style="[pos, {zIndex: zIndex}]">
        <div :id="position + '-action'" class="actions-container" :style="listPos">
            <transition name="fab-actions-appear"
                        :enter-active-class="transitionEnter"
                        :leave-active-class="transitionLeave"
            >
                <ul v-show="toggle" class="fab-list">
                    <template v-for="action in actions">
                        <transition
                                enter-active-class="animated quick zoomIn"
                                leave-active-class="animated quick zoomOut"
                        >
                            <template v-if="action.tooltip">
                                <li v-if="toggle" :style="{ 'background-color': action.color || bgColor }"
                                    v-tooltip="{ content: action.tooltip, placement: tooltipPosition }"
                                    @click="toParent(action.name)" class="pointer">
                                    <i class="material-icons">{{action.icon}}</i>
                                </li>
                            </template>
                            <template v-else>
                                <li v-if="toggle" :style="{ 'background-color': action.color || bgColor }"
                                    @click="toParent(action.name)" class="pointer">
                                    <i class="material-icons">{{action.icon}}</i>
                                </li>
                            </template>
                        </transition>
                    </template>
                </ul>
            </transition>
        </div>
        <template v-if="rippleShow">
            <template v-if="mainTooltip">
                <div v-ripple="rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''" @click="toggle = !toggle"
                     v-tooltip="{ content: mainTooltip, placement: tooltipPosition }"
                     class="fab pointer" :style="{ 'background-color': bgColor }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle }">{{mainIcon}}</i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle }">add</i>
                </div>
            </template>
            <template v-else>
                <div v-ripple="rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''" @click="toggle = !toggle"
                     class="fab pointer" :style="{ 'background-color': bgColor }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle }">{{mainIcon}}</i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle }">add</i>
                </div>
            </template>
        </template>
        <template v-else>
            <template v-if="mainTooltip">
                <div v-bind:v-tooltip="{ content: mainTooltip, placement: tooltipPosition }"
                     class="fab pointer" :style="{ 'background-color': bgColor }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle }">{{mainIcon}}</i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle }">add</i>
                </div>
            </template>
            <template v-else>
                <div class="fab pointer" :style="{ 'background-color': bgColor }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle }">{{mainIcon}}</i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle }">add</i>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway';
    import Ripple from 'vue-ripple-directive';
    import { VTooltip } from 'v-tooltip'

    export default {
        mixins: [clickaway],
        directives: {Ripple, tooltip: VTooltip},
        data() {
            return {
                toggle: false,
                pos: {},
                tooltipPosition: 'left'
            }
        },
        props: {
            bgColor: {
                default: '#333333',
            },
            position: {
                default: 'bottom-right',
            },
            zIndex: {
                default: '999',
            },
            rippleShow: {
                default: true
            },
            rippleColor: {
                default: 'light'
            },
            mainIcon: {
                default: 'add'
            },
            mainTooltip: {
                default: null
            },
            actions: {}
        },
        computed: {
            listPos() {
                if (this.position === 'top-right' || this.position === 'top-left') {
                    return {
                        top: '-20px',
                        paddingTop: '20px'
                    }
                }
                return {
                    bottom: '-20px',
                    paddingBottom: '20px'
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
                if (this.position === 'top-right' || this.position === 'top-left') {
                    return {
                        enter: 'animated quick fadeInDown',
                        leave: 'animated quick fadeOutUp'
                    };
                } else if (this.position === 'bottom-right' || this.position === 'bottom-left') {
                    return {
                        enter: 'animated quick fadeInUp',
                        leave: 'animated quick fadeOutDown'
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
            tooltipPos() {
                if(this.position === 'top-right' || this.position === 'bototm-right') {
                    this.mainTooltip.placement = 'left'
                }  else {
                    this.mainTooltip.placement = 'right'
                }
            },
            toParent(name) {
                this.$emit(name);
                this.toggle = false;
            },
            away() {
                this.toggle = false;
            },
            setPosition() {
                this.pos = {};
                switch (this.position) {
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
                let wrapper = document.getElementById(this.position + '-wrapper');
                let el = document.getElementById(this.position + '-action');

                if (this.position === 'top-right' || this.position === 'top-left') {
                    wrapper.appendChild(el);
                } else {
                    wrapper.insertBefore(el, wrapper.childNodes[0]);
                }
            }
        },
        watch: {
            position(val){
                this.setPosition();

                this.$nextTick(() => {
                    this.moveTransition();
                    this.tooltipPos();
                });
            }
        },
        mounted() {
            this.moveTransition();
        },
        created() {
            this.setPosition();
        }
    }
</script>

<style>
    .tooltip {
        display: block !important;
        padding: .5rem 1rem;
        z-index: 10000;
    }

    .tooltip .tooltip-inner {
        background: #333333;
        font-size: .85rem;
        color: white;
        padding: .2rem 1rem;
    }

    .tooltip .tooltip-arrow{
        display: none;
    }

    .tooltip[aria-hidden='true'] {
        visibility: hidden;
        opacity: 0;
        transition: opacity .15s, visibility .15s;
    }

    .tooltip[aria-hidden='false'] {
        visibility: visible;
        opacity: 1;
        transition: opacity .15s;
    }
</style>

<style scoped>
    .animated.quick {
        -webkit-animation-duration: .7s !important;
        animation-duration: .7s !important;
    }

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
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.20), 0 4px 4px rgba(0, 0, 0, 0.15);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .fab .material-icons {
        color: white;
        -webkit-transition: .4s all;
        -moz-transition: .4s all;
        transition: .4s all;
        margin: 0px auto;
    }

    .fab .material-icons.main {
        opacity: 1;
        position: absolute;
    }

    .fab .material-icons.close {
        opacity: 0;
        position: absolute;
    }

    .fab .material-icons.main.rotate {
        -ms-transform: rotate(315deg); /* IE 9 */
        -webkit-transform: rotate(315deg); /* Chrome, Safari, Opera */
        transform: rotate(315deg);
        opacity: 0;
        -webkit-transition: opacity .3s ease-in, -webkit-transform .4s; /* Safari */
        transition: opacity .3s ease-in, transform .4s;
    }

    .fab .material-icons.close.rotate {
        -ms-transform: rotate(315deg); /* IE 9 */
        -webkit-transform: rotate(315deg); /* Chrome, Safari, Opera */
        transform: rotate(315deg);
        opacity: 1;
        -webkit-transition: opacity .3s ease-in, -webkit-transform .4s; /* Safari */
        transition: opacity .3s ease-in, transform .4s;
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
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.20), 0 4px 4px rgba(0, 0, 0, 0.15);
    }

    .fab-list li .material-icons {
        color: white;
        margin: 0px auto;
    }

    .pointer {
        cursor: pointer;
    }

    ul {
        list-style-type: none;
        padding: 0 !important;
    }

    .fab-wrapper .actions-container {
        overflow: hidden;
        z-index: 0;
        position: relative;
    }

    /* Rules for sizing the icon. */
    .material-icons.md-18 {
        font-size: 18px;
    }

    .material-icons.md-24 {
        font-size: 24px;
    }

    .material-icons.md-36 {
        font-size: 36px;
    }

    .material-icons.md-48 {
        font-size: 48px;
    }

    /* Rules for using icons as black on a light background. */
    .material-icons.md-dark {
        color: rgba(0, 0, 0, 0.54);
    }

    .material-icons.md-dark.md-inactive {
        color: rgba(0, 0, 0, 0.26);
    }

    /* Rules for using icons as white on a dark background. */
    .material-icons.md-light {
        color: rgba(255, 255, 255, 1);
    }

    .material-icons.md-light.md-inactive {
        color: rgba(255, 255, 255, 0.3);
    }

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