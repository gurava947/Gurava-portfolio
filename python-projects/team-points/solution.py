def calculate_league_points(wins, draws, losses):
    points = (wins * 4) + (draws * 2) + (losses * -1)
    return points
statistics = input().split(",")
wins = int(statistics[0])
draws = int(statistics[1])
losses = int(statistics[2])
# Call the calculate_league_points function
total_points = calculate_league_points(wins, draws, losses)
print(total_points)
