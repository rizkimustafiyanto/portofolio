package mapper

import "fmt"

func Int32ValueToInt(v *int32) int {
	if v == nil {
		return 0
	}
	return int(*v)
}

func StringValue(v *string) string {
	if v == nil {
		return ""
	}
	return *v
}

func FormatUint(id uint) string {
	return fmt.Sprintf("%d", id)
}
