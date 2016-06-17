$(() => {
  class SignBox {
    constructor() {
      this._initHTML()

      this.$form = this.$html.find('form')
      this.$panel = this.$html.find('.panel')
      this.$inputs = this.$html.find('.form-control')
      this.$header = this.$html.find('.panel-heading')
      this.$username = this.$html.find('#sigin-username')
      this.$password = this.$html.find('#sigin-password')
      this.$submitBtn = this.$html.find('.btn')
      this.$formGroups = this.$form.find('.form-group')
      this.$mask = this.$html.find('.mask')
      this.$close = this.$html.find('.fa-times')

      this.moveInfo = {
        active: false,
        startX: 0,
        startY: 0,
        translateX: 0,
        translateY: 0,
        diffX: 0,
        diffY: 0
      }

      this._bindEvent()
      this._handleMove()
    }

    _initHTML() {
      this.$html = $(`
        <div id="sign-pop-box">
            <div class="mask"></div>
            <div class="panel">
                <div class="panel-heading text-center">
                    <i class="fa fa-times"></i>
                    <span>登&emsp;录</span>
                </div>
                <form class="panel-body" action="/sign/signin" method="POST">
                    <div class="form-group">
                        <label for="sigin-username">账号</label>
                        <input id="sigin-username" type="text" name="username" class="form-control" h-placeholder="邮箱/手机号/用户名">
                    </div>
                    <div class="form-group">
                        <label for="sigin-password">密码</label>
                        <input id="sigin-password" type="password" name="password" class="form-control" h-placeholder="请输入密码">
                    </div>
                    <div class="text-right">
                        <a href="/sign/signup">还没有账号?</a>
                        <span>|</span>
                        <a href="#">忘记密码?</a>
                    </div>
                    <button type="submit" class="btn btn-block btn-primary">登&emsp;&emsp;录</button>
                </form>
            </div>
        </div>
    `)
      $('body').append(this.$html)
    }
    _bindEvent() {
      this.$mask.on('click', this.hide)
      this.$close.on('click', this.hide)

      this.$inputs.on('focus', e => {
        var $target = $(e.target)
        $target.closest('.form-group').addClass('active')
        setTimeout(() => {
          $target.attr('placeholder', $target.attr('h-placeholder'))
        }, 200)
      })

      this.$inputs.on('blur', e => {
        var $target = $(e.target)
        if ($target.val().trim()) return
        $target
          .attr('placeholder', '')
          .closest('.form-group').removeClass('active')
      })

      this.$inputs.on('input', e => {
        var $target = $(e.target)

        if (!$target.val()) $target.closest('.form-group').addClass('has-error')
        else $target.closest('.form-group').removeClass('has-error')

        if (this.$username.val() && this.$password.val()) this.$submitBtn.attr('disabled', false)
        else this.$submitBtn.attr('disabled', true)
      })
    }
    _handleMove = e => {
      this.$header.mousedown(e => {
        e.preventDefault()
        if ($(e.target).is('.fa')) return
        this.moveInfo.active = true
        this.moveInfo.startX = e.pageX
        this.moveInfo.startY = e.pageY
      })

      this.$header.mousemove(e => {
        e.preventDefault()
        if (!this.moveInfo.active) return
        this.moveInfo.diffX = e.pageX - this.moveInfo.startX
        this.moveInfo.diffY = e.pageY - this.moveInfo.startY

        this.$panel.css({
          transform: ['translate(', (this.moveInfo.diffX - this.moveInfo.translateX), 'px,', (this.moveInfo.diffY - this.moveInfo.translateY), 'px)'].join('')
        })
      })

      this.$header.on('mouseup mouseleave', () => {
        this.moveInfo.active = false
        this.moveInfo.translateX -= this.moveInfo.diffX
        this.moveInfo.translateY -= this.moveInfo.diffY
        this.moveInfo.diffX = this.moveInfo.diffY = 0
      })
    }
    setAction = (url) => {
      this.$form.attr('action', url)
    }
    show = () => {
      this.$html.addClass('active')
    }
    hide = () => {
      this.$html.removeClass('active')
      this.$formGroups.removeClass('has-error')
      setTimeout(() => {
        this.$panel.css('transform', 'translate(0)')
      }, 500)

      this.moveInfo = {
        active: false,
        startX: 0,
        startY: 0,
        translateX: 0,
        translateY: 0,
        diffX: 0,
        diffY: 0
      }
    }
  }

  window.signBox = new SignBox()
})

