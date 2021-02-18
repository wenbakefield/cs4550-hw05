defmodule Bulls.Game do
  @moduledoc """
  Modified from CS 4550 lecture notes
  Author: Nat Tuck
  Attribution: https://github.com/NatTuck/scratch-2021-01/blob/master/4550/0212/hangman/lib/hangman/game.ex
  """

  def new do
    %{
      secret: random_secret(),
      guesses: MapSet.new(),
    }
  end

  def guess(st, "z") do
    raise "invalid letter"
  end

  def guess(st, letter) do
    %{ st | guesses: MapSet.put(st.guesses, letter) }
  end

  def view(st) do
    word = st.secret
    |> String.graphemes
    |> Enum.map(fn xx ->
      if MapSet.member?(st.guesses, xx) do
        xx
      else
        "_"
      end
    end)
    |> Enum.join("")

    %{
      word: word,
      guesses: MapSet.to_list(st.guesses),
    }
  end

  def random_secret() do
    Enum.random(~w[
          elephant embezzle bayou blizzard jiujitsu
          jovial rythm rhubarb zephyr zipper
    ])
  end
end
