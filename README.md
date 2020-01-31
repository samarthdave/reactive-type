# ReactiveType

a typing test (as if we needed another one) - built in React

### Features/done:
- tracks each word and highlights
- :heavy_check_mark: clean up Home.js (separate into diff. components?)
- shows error/color on invalid user input
- :heavy_check_mark: highlights each letter and compare 2 strings

### Future Features
- **Typing Speed**
  - store previous errors & use that to compute typing speed
  - calculate wpm (maybe even count errors)
  - start timer with first word
- import text/file into the program
- hot swap themes
- congrats message
  - [https://codesandbox.io/s/2p7no5ol8r](https://codesandbox.io/s/2p7no5ol8r)

### Goals
- An interface like [LiveChatInc](https://www.livechatinc.com/typing-speed-test/#/)
- Functionality similar to [KeyHero](https://www.keyhero.com/free-typing-test/)

##### Misc.
Removed these lines:
```
{
  "src": "favicon.ico",
  "sizes": "64x64 32x32 24x24 16x16",
  "type": "image/x-icon"
},
{
  "src": "logo192.png",
  "type": "image/png",
  "sizes": "192x192"
},
{
  "src": "logo512.png",
  "type": "image/png",
  "sizes": "512x512"
}
```