import unittest

from support import run_solution


class StringRepetition4Test(unittest.TestCase):
    def test_case_01_hi_three_times(self):
        """Hi three times."""
        result = run_solution('string-repetition-4', 'Hi\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi Hi Hi \n')

    def test_case_02_go_twice(self):
        """Go twice."""
        result = run_solution('string-repetition-4', 'Go\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Go Go \n')

    def test_edge_01_zero_repeats(self):
        """Zero repeats."""
        result = run_solution('string-repetition-4', 'Hi\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_empty_string(self):
        """Empty string."""
        result = run_solution('string-repetition-4', '\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  \n')


if __name__ == "__main__":
    unittest.main()
