# Warshat Fan — UI kit

Runnable browser composition of the public marketplace shell.

## Structure

```
ui_kits/app/
  index.html          # React + Babel entry
  components/
    Header.jsx        # Sticky logo header
    Hero.jsx          # Split hero
    ActivityGrid.jsx  # Open activity circle cards
    TrainingList.jsx  # Training workshop cards
    SiteFooter.jsx    # Olive footer
    App.jsx           # Composes all roles
```

## Usage

Open `index.html` in the Design Files preview. It loads `../../colors_and_type.css` and mounts `<App />` into `#root`.

## Design notes

- RTL Arabic default
- Tokens from globals.css extraction
- Mock workshops mirror source `page.tsx` categories

## Source basis

- `src/components/Header.tsx`
- `src/components/WixHero.tsx`
- `src/components/WixActivityCard.tsx`
- `src/components/WixTrainingCard.tsx`
- `src/app/page.tsx`
