import unittest

from support import run_solution


class FirstPlaceTest(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('first-place', 'Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'n\n')

    def test_case_02_single_character(self):
        """Single character."""
        result = run_solution('first-place', 'A\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A\n')

    def test_case_03_text_ending_in_a_digit(self):
        """Text ending in a digit."""
        result = run_solution('first-place', 'Level 3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')


if __name__ == "__main__":
    unittest.main()
