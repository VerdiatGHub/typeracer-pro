# Sound Files

This directory should contain the following audio files for the TypeRacer Pro game:

## Required Sound Files:

### 1. `keystroke.mp3` or `keystroke.wav`
- **Purpose**: Plays when user types a correct character
- **Recommended**: Short, light mechanical keyboard click sound
- **Duration**: ~50-100ms
- **Suggested sources**: 
  - [Freesound.org](https://freesound.org/search/?q=keyboard+click)
  - [Mixkit](https://mixkit.co/free-sound-effects/keyboard/)

### 2. `error.mp3` or `error.wav`
- **Purpose**: Plays when user types an incorrect character
- **Recommended**: Subtle error/buzz sound
- **Duration**: ~100-200ms
- **Suggested sources**:
  - [Freesound.org](https://freesound.org/search/?q=error+beep)
  - [Mixkit](https://mixkit.co/free-sound-effects/error/)

### 3. `button-click.mp3` or `button-click.wav`
- **Purpose**: Plays on button clicks
- **Recommended**: Satisfying UI click sound
- **Duration**: ~50-100ms
- **Suggested sources**:
  - [Freesound.org](https://freesound.org/search/?q=button+click)
  - [UI Sounds](https://uisounds.prototypr.io/)

### 4. `complete.mp3` or `complete.wav`
- **Purpose**: Plays when race is completed
- **Recommended**: Success/achievement sound
- **Duration**: ~1-2 seconds
- **Suggested sources**:
  - [Freesound.org](https://freesound.org/search/?q=success+game)
  - [Mixkit](https://mixkit.co/free-sound-effects/win/)

### 5. `lofi-bg.mp3`
- **Purpose**: Background music during gameplay
- **Recommended**: Calm, non-distracting lofi beat
- **Duration**: 2-3 minutes (will loop)
- **Suggested sources**:
  - [YouTube Audio Library](https://www.youtube.com/audiolibrary/music) - Filter by "Hip Hop & Lofi"
  - [Chosic](https://www.chosic.com/free-music/lofi/)
  - [Bensound](https://www.bensound.com/royalty-free-music/track/lofi-study)

## Quick Setup:

1. Download free sounds from the sources above
2. Rename them to match the filenames listed
3. Place them in this `public/sounds/` directory
4. Refresh your app - sounds should work automatically!

## File Format Notes:

- **MP3**: Smaller file size, good browser support
- **WAV**: Higher quality, larger file size
- **OGG**: Good alternative with wide support

The app will try to load sounds, but will continue to work even if sound files are missing.

## Volume Recommendations:

- Keystroke: 0.2-0.3 (subtle)
- Error: 0.3-0.4 (noticeable but not jarring)
- Button: 0.3-0.4
- Complete: 0.5-0.6
- Background music: 0.15-0.25 (very subtle, background)

