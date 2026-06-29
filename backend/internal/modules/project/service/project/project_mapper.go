package projectservice

import (
	"backend/internal/modules/project/dto"
	"backend/internal/modules/project/model"
	"backend/pkg/convert"
	"backend/pkg/formatter"
)

func toProjectDTO(project *model.Project) *dto.Project {
	if project == nil {
		return nil
	}

	return &dto.Project{
		ID:          project.ID,
		Slug:        project.Slug,
		Title:       project.Title,
		Description: project.Description,
		Role:        project.Role,
		Duration:    project.Duration,
		DemoURL:     project.DemoURL,

		Detail: toProjectDetailDTO(project.Detail),

		CreatedAt: formatter.FormatTime(project.CreatedAt),
		UpdatedAt: formatter.FormatTime(project.UpdatedAt),
	}
}

func toProjectDetailDTO(detail *model.ProjectDetail) *dto.ProjectDetail {
	if detail == nil {
		return nil
	}

	return &dto.ProjectDetail{
		ID:       detail.ID,
		Problem:  detail.Problem,
		Solution: detail.Solution,

		Responsibilities: toProjectResponsibilityDTOs(detail.Responsibilities),
		Results:          toProjectResultDTOs(detail.Results),
	}
}

func toProjectResponsibilityDTOs(
	items []model.ProjectResponsibility,
) []*dto.ProjectResponsibility {

	if len(items) == 0 {
		return nil
	}

	result := make([]*dto.ProjectResponsibility, 0, len(items))

	for _, item := range items {

		result = append(result, &dto.ProjectResponsibility{
			ID:             item.ID,
			Responsibility: item.Responsibility,
			SortOrder:      item.SortOrder,
		})
	}

	return result
}

func toProjectResultDTOs(
	items []model.ProjectResult,
) []*dto.ProjectResult {

	if len(items) == 0 {
		return nil
	}

	result := make([]*dto.ProjectResult, 0, len(items))

	for _, item := range items {

		result = append(result, &dto.ProjectResult{
			ID:        item.ID,
			Result:    item.Result,
			SortOrder: item.SortOrder,
		})
	}

	return result
}

func ParseProjectID(rawID string) (uint, error) {
	return convert.ParseUint(rawID)
}
