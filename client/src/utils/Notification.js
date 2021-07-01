import Swal from 'sweetalert2'
import { AppState } from '../AppState'

export default class Notification {
  /**
 *
 * @param {string} title The title text.
 * @param {string} text The body text.
 * @param {string} icon 'success', 'error', 'info', 'warning', or 'question'.
 * @param {string} confirmButtonText The text of your confirm button.
 * -----------------------------------
 * {@link https://sweetalert2.github.io/#configuration|Check out Sweet Alerts}
 */
  static async confirmAction(title = 'Are you sure?', text = "You won't be able to revert this!", icon = 'warning', confirmButtonText = 'Yes, delete it!') {
    try {
      const res = await Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#4f6031',
        cancelButtonColor: '#8b2f15',
        confirmButtonText: confirmButtonText
      })
      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  /**
 *
 * @param {string} title The title text
 * @param {string} display 'success', 'error', 'info', 'warning', or 'question'.
 * @param {string} position 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
 * @param {number} timer Time in milliseconds.
 * @param {boolean} progressBar Show progress bar or not respectively.
 * -----------------------------------
 * {@link https://sweetalert2.github.io/#configuration|Check out Sweet Alerts}
 */
  static toast(title = 'Warning!', display = 'warning', position = 'top-end', timer = 1000, progressBar = false) {
    Swal.fire({
      title: title,
      icon: display,
      position: position,
      timer: timer,
      timerProgressBar: progressBar,
      toast: true,
      showConfirmButton: false,
      showClass: {
        popup: 'animated fadeInDown faster',
        icon: 'animated heartBeat delay-1s'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    })
  }

  static async username(username = AppState.account.name) {
    const { value: name } = await Swal.fire({
      icon: 'info',
      title: 'Customize your Username',
      input: 'text',
      inputPlaceholder: username
    })
    if (name) {
      AppState.account.name = name
    }
  }

  static async character(username = AppState.activeCharacter.name) {
    const { value: name } = await Swal.fire({
      icon: 'question',
      title: "What is your character's name?",
      input: 'text',
      inputPlaceholder: username
    })
    if (name) {
      AppState.activeCharacter.name = name
      const { value: imgUrl } = await Swal.fire({
        icon: 'question',
        title: 'What does your character look like?',
        input: 'text',
        inputPlaceholder: 'Paste the URL of your preferred image'
      })
      if (imgUrl) {
        AppState.activeCharacter.imgUrl = imgUrl
      }
    }
  }
}
