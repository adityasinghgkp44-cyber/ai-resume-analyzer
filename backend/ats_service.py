def calculate_ats_score(matched_skills, required_skills):

    if len(required_skills) == 0:
        return 0

    score = (len(matched_skills) / len(required_skills)) * 100

    return round(score)