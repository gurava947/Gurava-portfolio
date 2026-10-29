import unittest

from support import run_solution


class IdentifyTheMistakeShapeTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """n = 4."""
        result = run_solution('identify-the-mistake-shape', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   $$$$\n  $$$$\n $$$$\n$$$$\n')

    def test_case_02_n_2(self):
        """n = 2."""
        result = run_solution('identify-the-mistake-shape', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, ' $$\n$$\n')


if __name__ == "__main__":
    unittest.main()
